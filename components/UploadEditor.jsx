import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input, Select } from 'antd';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import PropTypes, { func } from 'prop-types';

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
    const [text, setText] = useState(contents?.text || "");
    const [heicFile, setHeicFile] = useState(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if(addPostDone && uploadedPost) {
            alert('성공적으로 업로드 되었습니다!');
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
        let selectedSubCategory = selectedCategory.SubCategories.filter((s) => s.domain !== ''); // 각 서브카테고리의 main 주제(index) 필터링
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
            return alert('제목을 입력하세요!');
        };
        if(!subCategoryId) {
            return alert('서브 게시판을 선택하세요!');
        };
        if(!text || text === '<p><br></p>') {
            return alert('글을 작성해주세요!');
        };
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
    

    const imageHandler = () => {
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*,.heic,.heif');
        input.setAttribute("multiple","");
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            // const file = input.files[0];
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            [].forEach.call(input.files, async (f) => {
                if (f.type === "image/heic" | f.type === "image/heif") { // if the image format is .heic | .heif
                    const originName = f.name.split('.')[0];
                    const reader = new FileReader();
                    const heic2any = (await import("heic2any")).default;
                    heic2any({
                        blob: f,
                        toType: "image/jpeg",
                        quality: 1,
                    })
                    .then((rb) => {
                        const file = new File(
                            [rb], originName+".jpg",
                            { type: "image/jpeg", lastModified: new Date().getTime() }
                        );
                        reader.readAsDataURL(file);
                        reader.onloadend = async() => {
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
                            formData.append('image', dataURLtoFile(reader.result, originName+".jpg"));
                            // formData.append('image', file); // formData는 키-밸류 구조
                            // 백엔드 multer라우터에 이미지를 보낸다.
                            try {
                                const result = await axios.post(`${backUrl}/post/images`, formData, { withCredentials: true });
                                result.data.map((url) => {
                                    const editor = quillRef.current.getEditorSelection(); // // 2. 현재 에디터 커서 위치값을 가져온다 + 에디터 객체 가져오기
                                    quillRef.current.getEditor().insertEmbed(editor.index, 'image', url.replace(/\/resized\//, '/original/')); // 가져온 위치에 이미지를 삽입한다
                                    quillRef.current.getEditor().setSelection(editor.index + 1);
                                });
                            } catch (error) {
                                alert('이미지 업로드 중 에러가 발생했습니다 ㅠㅠ');
                                console.error('IMG UPLOAD ERROR', error);
                            };
                        };
                    });
                } else { // if the image format is not .heic | .heif
                    formData.append('image', f);
                    try {
                        const result = await axios.post(`${backUrl}/post/images`, formData, { withCredentials: true });
                        result.data.map((url) => {
                            const editor = quillRef.current.getEditorSelection(); // // 2. 현재 에디터 커서 위치값을 가져온다 + 에디터 객체 가져오기
                            quillRef.current.getEditor().insertEmbed(editor.index, 'image', url.replace(/\/resized\//, '/original/')); // 가져온 위치에 이미지를 삽입한다
                            quillRef.current.getEditor().setSelection(editor.index + 1);
                        });
                    } catch (error) {
                        alert('이미지 업로드 중 에러가 발생했습니다 ㅠㅠ');
                        console.error('IMG UPLOAD ERROR', error);
                    };
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
                <Input className='upload-title-input' value={title} required showCount maxLength={30} onChange={onChangeTitle} placeholder="멋진 제목을 써주세요!" allowClear={true} />

                {/* Main Category */}
                <Select
                    className='upload-category-select'
                    placeholder="게시판을 선택해주세요."
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
                        placeholder="서브 게시판을 선택해주세요."
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
                    placeholder="글과 사진으로 여러분의 이야기를 들려주세요 : )"
                    theme="snow"
                    />

                {/* Submit Button */}
                <Button type='primary' htmlType="submit" loading={addPostLoading} >{isNew ? '업로드' : '수정하기'}</Button>
            </Form>
        </div>
    );
};

UploadEditor.propTypes = {
    contents: PropTypes.object,
    isNewContents: PropTypes.bool,
};

export default UploadEditor;