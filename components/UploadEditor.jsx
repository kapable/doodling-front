import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input, Select, Modal } from 'antd';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import PropTypes, { func } from 'prop-types';
import imageCompression from "browser-image-compression";
import * as gtag from '../lib/gtag';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }) {
        return <RQ ref={forwardedRef} {...props} />;
    };
}, { ssr: false });

import React, { useState, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { backUrl } from '../config/config';
import { useEffect } from 'react';
import { ADD_POST_REQUEST, EDIT_POST_REQUEST } from '../reducers/post';

const { Option } = Select;

const UploadEditor = ({ contents, isNewContents }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { myInfo } = useSelector((state) => state.user);
    const { categories } = useSelector((state) => state.category);
    const { addPostDone, uploadedPost, addPostLoading } = useSelector((state) => state.post);

    const [isNew, setIsNew] = useState(isNewContents); // upload Or Edit
    const [title, onChangeTitle] = useInput(contents?.title || '');
    const [category, setCategory] = useState(contents?.SubCategory.Category.label || '');
    const [categoryId, setCategoryId] = useState(contents?.SubCategory.Category.id || '');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState(contents?.SubCategory.label || '');
    const [subCategoryId, setSubCategoryId] = useState(contents?.SubCategoryId || '');
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [text, setText] = useState(contents?.text || "");
    const quillRef = useRef(null);

    useEffect(() => {
        if(addPostDone && uploadedPost) {
            alert('??????????????? ????????? ???????????????!');
            router.push(`/${uploadedPost.SubCategory.Category.domain}/${uploadedPost.SubCategory.domain}/${uploadedPost.id}`);
        };
    }, [addPostDone, uploadedPost]);

    // for Edit mode
    useEffect(() => {
        if(!isNew) {
            let selectedCategory = categories.find((c) => c.label === category);
            setSubCategories(selectedCategory.SubCategories);
        }
    }, [category, categories, isNew]);

    const onCategoryChange = useCallback((cat) => {
        setCategory(cat);
        let selectedCategory = categories.find((c) => c.label === cat);
        setCategoryId(selectedCategory.id);
        let selectedSubCategory = selectedCategory.SubCategories.filter((s) => s.domain !== ''); // ??? ????????????????????? main ??????(index) ?????????
        setSubCategories(selectedSubCategory);
        if(selectedSubCategory.length > 0) {
            setSubCategory(selectedSubCategory[0].label)
            setSubCategoryId(selectedSubCategory[0].id)
        };
    }, [categories]);

    const onSubCategoryChange = useCallback((subCat) => {
        setSubCategory(subCat)
        if(subCategories) {
            let selectedSubCategory = subCategories.find((sub) => sub.label === subCat)
            setSubCategoryId(selectedSubCategory.id);
        }
    }, [categories, subCategories]);

    const onSubmit = useCallback(() => {
        if(!title || !title.trim()) {
            return alert('????????? ???????????????!');
        };
        if(!subCategoryId) {
            return alert('?????? ???????????? ???????????????!');
        };
        if(!text || text === '<p><br></p>') {
            return alert('?????? ??????????????????!');
        };
        gtag.event({ action: "Click the Upload Article Button", category: "Posting", label: "upload page" });
        isNew
        ? ( // upload a New Post
            dispatch({
                type: ADD_POST_REQUEST,
                data: {
                    title,
                    text,
                    categoryId,
                    subCategoryId,
                }
            })
        )
        : ( // edit a existing Post
            dispatch({
                type: EDIT_POST_REQUEST,
                data: {
                    postId: contents?.id,
                    title,
                    text,
                    categoryId,
                    subCategoryId,
                }
            })
        )
    }, [title, text, categoryId, subCategoryId, contents?.id]);
    
    const dataURLtoFile = (dataurl, fileName) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
    };

    const imageHandler = () => {
        // 1. ???????????? ????????? input type=file DOM??? ?????????.
        const input = document.createElement('input');
        // ?????? ?????????
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*,.heic,.heif');
        input.setAttribute("multiple","");
        input.click(); // ????????? ?????????????????? ???????????? ??? input??? ????????????.
        // input??? ???????????? ?????? ???????????? ????????????.

        // input??? ????????? ???????????? = ???????????? ??????
        input.addEventListener('change', async () => {
            // multer??? ?????? ???????????? ????????? ???????????????.
            const formData = new FormData();
            const maxFileSize = 3;
            [].forEach.call(input.files, async (fileInput) => {
                // image upload start
                setIsImageUploading(true);
                const originName = fileInput.name.split('.')[0];
                let file;
                // compression if A img file size over 3MB to 3MB
                fileInput.size > maxFileSize * 1024 * 1024
                ? file = await imageCompression(fileInput, {
                    maxSizeMB: maxFileSize,
                })
                : file = fileInput;
                // if the image format is .heic | .heif
                if (file.type === "image/heic" || file.type === "image/heif") {
                    const reader = new FileReader();
                    const heic2any = (await import("heic2any")).default;
                    heic2any({
                        blob: file,
                        toType: "image/jpeg",
                        quality: 1,
                    })
                    .then((rb) => {
                        const jpgFfile = new File(
                            [rb], originName+".jpg",
                            { type: "image/jpeg", lastModified: new Date().getTime() }
                        );
                        reader.readAsDataURL(jpgFfile);
                        reader.onloadend = async() => {
                            formData.append('image', dataURLtoFile(reader.result, originName+".jpg"));
                            // ????????? multer???????????? ???????????? ?????????.
                            try {
                                const result = await axios.post(`${backUrl}/post/images`, formData, { withCredentials: true });
                                result.data.map((url) => {
                                    const editor = quillRef.current.getEditorSelection(); // // 2. ?????? ????????? ?????? ???????????? ???????????? + ????????? ?????? ????????????
                                    quillRef.current.getEditor().insertEmbed(editor.index, 'image', url.replace(/\/resized\//, '/original/')); // ????????? ????????? ???????????? ????????????
                                    quillRef.current.getEditor().setSelection(editor.index + 1);
                                });
                                setIsImageUploading(false);
                            } catch (error) {
                                alert(`????????? ????????? ??? ????????? ?????????????????? ??????`);
                                console.error('IMG UPLOAD ERROR', error);
                                setIsImageUploading(false);
                            };
                        };
                    });
                } else { // if the image format is not .heic || .heif
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = async() => {
                        formData.append('image', dataURLtoFile(reader.result, originName+".jpg"));
                        try {
                            const result = await axios.post(`${backUrl}/post/images`, formData, { withCredentials: true });
                            result.data.map((url) => {
                                const editor = quillRef.current.getEditorSelection(); // // 2. ?????? ????????? ?????? ???????????? ???????????? + ????????? ?????? ????????????
                                quillRef.current.getEditor().insertEmbed(editor.index, 'image', url.replace(/\/resized\//, '/original/')); // ????????? ????????? ???????????? ????????????
                                quillRef.current.getEditor().setSelection(editor.index + 1);
                            });
                            setIsImageUploading(false);
                        } catch (error) {
                            alert(`????????? ????????? ??? ????????? ?????????????????? ??????`);
                            console.error('IMG UPLOAD ERROR', error);
                            setIsImageUploading(false);
                        };
                    }
                }
            });
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    // [{ header: '1' }, { header: '2' }, { font: [] }],
                    // [{ size: [] }],
                    // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    // [
                    //     { list: 'ordered' },
                    //     { list: 'bullet' },
                    //     { indent: '-1' },
                    //     { indent: '+1' },
                    // ],
                    ['image'],
                    // ['clean'],
                    // [{ align: ['', 'center', 'right']}]
                ],
                handlers: {
                    image: imageHandler,
                },
                clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                },
            },
        }
    }, []);

    const formats = [
      //   'header',
      //   'font',
      //   'size',
      //   'bold',
      //   'italic',
      //   'underline',
      //   'strike',
      //   'blockquote',
      //   'list',
      //   'bullet',
      //   'indent',
      //   'link',
        'image',
      //   'video',
      // 'align',
    ];

    return (
        <div className='upload-main-div'>
            <Form encType="multipart/form-data" acceptCharset="UTF-8" onFinish={onSubmit}>
                {/* Title */}
                <Input className='upload-title-input' value={title} required showCount maxLength={30} onChange={onChangeTitle} placeholder="?????? ????????? ????????????!" allowClear={true} />

                {/* Main Category */}
                <Select
                    className='upload-category-select'
                    placeholder="???????????? ??????????????????."
                    optionLabelProp='type'
                    onChange={onCategoryChange}
                    value={category}
                    >
                    {/* Filtering NOTICE category for admin user */}
                    {categories.map((cat) => {
                        if(myInfo?.admin === true) {
                            if(cat.domain !== '' && cat.domain !== 'top100') {
                                return <Option value={cat.label} key={cat.domain} />
                            }
                        }
                        if(cat.domain !== '' && cat.domain !== 'notice' && cat.domain !== 'top100') {
                            return <Option value={cat.label} key={cat.domain} />
                        }
                    })}
                </Select>

                {/* SubCategory */}
                {subCategories?.length > 0
                ? (
                    <Select
                        className='upload-subCategory-select'
                        placeholder="?????? ???????????? ??????????????????."
                        optionLabelProp='type'
                        onChange={onSubCategoryChange}
                        value={subCategory}
                    >
                        {subCategories.map((subCat) => (
                            <Option value={subCat.label} key={subCat.domain} />
                        ))}
                    </Select>
                )
                : null}
                
                {/* Editor Main */}
                <QuillNoSSRWrapper
                    className="upload-editor-quill"
                    forwardedRef={quillRef}
                    onChange={setText}
                    value={text}
                    modules={modules}
                    formats={formats}
                    placeholder="?????? ???????????? ???????????? ???????????? ??????????????? : )"
                    theme="snow"
                    />

                {/* Submit Button */}
                <Button type='primary' htmlType="submit" loading={addPostLoading} >{isNew ? '?????????' : '????????????'}</Button>
            </Form>
            
            {/* When Image uploading, open Modal */}
            <Modal title="????????? ????????? ???..." open={isImageUploading} footer={null}/>
        </div>
    );
};

UploadEditor.propTypes = {
    contents: PropTypes.object,
    isNewContents: PropTypes.bool,
};

export default UploadEditor;