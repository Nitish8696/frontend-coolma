import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import LinkTool from '@editorjs/link';
import axios from 'axios'

const Blog = () => {
    const ejInstance = useRef();
    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            onChange: async () => {
                let content = await editor.saver.save();
                console.log(content)
            },
            tools: {
                header: Header,
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            async uploadByFile(file) {
                                const formData = new FormData();
                                formData.append("file", file);

                                const response = await axios.post(
                                    `http://localhost:8000/api/blogimage`,
                                    formData,
                                    {
                                        headers: {
                                            "Content-Type": "multipart/form-data",
                                        },
                                        withCredentials: false,
                                    }
                                )
                                if (response.data.success === 1) {
                                    return response.data;
                                  }
                            }
                        }
                    }
                }
            }
        })
    }
    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor()
        }
        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null
        }
    }, [])
    return (
        <div id='editorjs' className='border w-full'>

        </div>
    )
}

export default Blog
