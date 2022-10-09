import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Input, Select } from 'antd';
import useInput from '../hooks/useInput';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }) {
        return <RQ ref={forwardedRef} {...props} />;
    };
}, { ssr: false });

import React, { useState, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { backUrl } from '../config/config';

const { Option } = Select;

const UploadEditor = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    const [title, onChangeTitle] = useInput('');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [value, setValue] = useState("");
    const quillRef = useRef(null);

    const onCategoryChange = useCallback((cat) => {
        let selectedCategory = categories.find((c) => c.label === cat);
        setSubCategories(selectedCategory.SubCategories);
        if(selectedCategory.SubCategories.length > 0) {
            setSubCategory(selectedCategory.SubCategories[0].label)
            setSubCategoryId(selectedCategory.SubCategories[0].id)
        };
    }, []);

    const onSubCategoryChange = useCallback((subCat) => {
        setSubCategory(subCat)
        if(subCategories) {
            let selectedSubCategory = subCategories.find((sub) => sub.label === subCat)
            setSubCategoryId(selectedSubCategory.id);
        }
    }, [categories, subCategories]);

    const imageHandler = () => {
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute("multiple","");
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            // const file = input.files[0];
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            [].forEach.call(input.files, (f) => {
                formData.append('image', f);
            });
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
            <form encType="multipart/form-data" acceptCharset="UTF-8">
                {/* Title */}
                <Input className='upload-title-input' value={title} required showCount maxLength={30} onChange={onChangeTitle} placeholder="멋진 제목을 써주세요!" allowClear={true} />

                {/* Main Category */}
                <Select
                    className='upload-category-select'
                    placeholder="게시판을 선택해주세요."
                    optionLabelProp='type'
                    onChange={onCategoryChange}
                    >
                    {categories.map((cat) => {
                        if(cat.domain !== 'main') {
                            return <Option value={cat.label} key={cat.domain} ></Option>
                        }
                    })}
                </Select>

                {/* SubCategory */}
                {subCategories?.length > 0
                ? (
                    <Select
                        className='upload-subCategory-select'
                        placeholder="서브게시판을 선택해주세요."
                        optionLabelProp='type'
                        onChange={onSubCategoryChange}
                        value={subCategory}
                    >
                        {subCategories.map((subCat) => (
                            <Option value={subCat.label} key={subCat.domain} ></Option>
                        ))}
                    </Select>
                )
                : null}
                
                {/* Editor Main */}
                <QuillNoSSRWrapper
                    className="upload-editor-quill"
                    forwardedRef={quillRef}
                    onChange={setValue}
                    value={value}
                    modules={modules}
                    formats={formats}
                    placeholder="글과 사진으로 여러분의 이야기를 들려주세요 : )"
                    theme="snow"
                    />

                {/* Submit Button */}
                <Button type='submit'>업로드</Button>
            </form>
            {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
        </div>
    );
};

export default UploadEditor;