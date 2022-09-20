import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
import React, { useState } from 'react'

const UploadEditor = () => {
    const [text, setText] = useState("");
    const modules = {
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
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
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
                <QuillNoSSRWrapper onChange={setText} modules={modules} formats={formats} placeholder="THIS" theme="snow" />
                <button type='submit'>USB</button>
            </form>
            {text}
        </div>
    )
}

export default UploadEditor;