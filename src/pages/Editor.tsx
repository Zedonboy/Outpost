//@ts-nocheck
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import Embed from "@editorjs/embed";
import S_Image from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import List from "@editorjs/list";
import Button from "../components/Button";
import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import InsertImage from "../plugins/InsertImage"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EditorStateAtom } from "../../atoms/editor";
import {
  useNavigate
} from "react-router-dom";
export default function Editor() {
  let setEditorData = useSetRecoilState(EditorStateAtom)
  let editorRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (editorRef.current) return;
    let editorjs = new EditorJS({
      holder: "editorjs",
      inlineToolbar: ['link', 'marker', 'bold', 'italic'],
      placeholder: "Write your ideas here",
      tools: {
        insert : InsertImage,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        link: Link,
        embed: Embed,
        code: Code,
        header: Header,
        quote: Quote,
        delimiter: Delimiter,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        image: S_Image,

      },
    });
    //@ts-ignore
    editorRef.current = editorjs;

  }, []);
  return (
    <main className="bg-gradient-to-r px-4 md:px-32">
      <nav className="flex md:px-32 px-4 fixed w-full top-0 left-0 right-0 justify-between p-1 items-center">
        <div>Logo</div>
        <div>
          <div className="mt-1  relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-indigo-500 bg-white bg-opacity-10 placeholder:text-gray-400 text-gray-400 outline-none block w-full pl-10 sm:text-sm border-gray-500 rounded-md"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <Button onClick={e => {
            if(editorRef.current){
              editorRef.current.save().then(data => {
                let _data = JSON.stringify(data)
                setEditorData(_data)
                navigate("/set-title")
              })
            }
          }}>Save</Button>
        </div>
      </nav>
      <div className="mt-24 p-12 min-h-screen flex justify-center items-center">
        <div id="editorjs"></div>
      </div>
    </main>
  );
}
