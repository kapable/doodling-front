import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
import React, { useState, useMemo, useRef } from 'react';

const UploadEditor = () => {
    const [value, setValue] = useState("");
    const quillRef = useRef();

    const imageHandler = () => {

    };
    const modules = useMemo(() => {
        return {
            toolbar: [
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
            ],
            handlers: {
                image: imageHandler,
            },
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        }
    });
    /*
    * Quill editor formats
    * See https://quilljs.com/docs/formats/
    */
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
    ]
    return (
        <div>
            <form>
                <QuillNoSSRWrapper
                    ref={quillRef}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    placeholder="THIS"
                    theme="snow" />
                <button type='submit'>USB</button>
            </form>
            {value}
        </div>
    )
}

export default UploadEditor;