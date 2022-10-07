import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }) {
        return <RQ ref={forwardedRef} {...props} />;
    };
}, { ssr: false });

import React, { useState, useMemo, useRef } from 'react';
import axios from 'axios';

const UploadEditor = () => {
    const [value, setValue] = useState("");
    const quillRef = useRef(null);

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
            console.log(input.files);
            [].forEach.call(input.files, (f) => {
                formData.append('image', f);
            });
            // formData.append('image', file); // formData는 키-밸류 구조
            // 백엔드 multer라우터에 이미지를 보낸다.
            try {
                const result = await axios.post(`https://api.doodling.kr/post/images`, formData);
                console.log(result);
                result.data.map((url) => {
                    // const IMG_URL = result.data[0];
                    const editor = quillRef.current.getEditorSelection(); // // 2. 현재 에디터 커서 위치값을 가져온다 + 에디터 객체 가져오기
                    quillRef.current.getEditor().insertEmbed(editor.index, 'image', url); // 가져온 위치에 이미지를 삽입한다
                    quillRef.current.getEditor().setSelection(editor.index + 1);
                    // document.body.querySelector(':scope > input').remove()
                });

            } catch (error) {
                alert('이미지 업로드 중 에러가 발생했습니다 ㅠㅠ');
                console.error('IMG UPLOAD ERROR', error);
            }
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
    ]
    return (
        <div className='main-div' style={{ maxWidth: '50rem', width: "100%", margin: '0 auto' }}>
            <form encType="multipart/form-data" acceptCharset="UTF-8">
                <QuillNoSSRWrapper
                    forwardedRef={quillRef}
                    onChange={setValue}
                    value={value}
                    modules={modules}
                    formats={formats}
                    placeholder="THIS"
                    theme="snow"
                    style={{ maxWidth: '50rem', width: "100%", margin: '0 auto' }} />
                <button type='submit'>USB</button>
            </form>
            <div dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
    )
}

export default UploadEditor;