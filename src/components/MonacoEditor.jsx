import { Editor } from "@monaco-editor/react";
import React from "react";
import { GlobalContext } from "../context/context";
import { useContext } from "react";
import { DARKTHEME } from "../constants/constants";

const MonacoEditor = ({
  height,
  defaultLanguage,
  hadleEditorChange,
  language,
  value,
}) => {
  const { appTheme } = useContext(GlobalContext);

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  return (
    <Editor
      value={value}
      height={height || "400px"}
      defaultLanguage={defaultLanguage || "javascript"}
      language={language || defaultLanguage || "javascript"}
      defaultValue="//Add your code here"
      theme={appTheme === DARKTHEME ? "vs-dark" : "vs-light"}
      onChange={handleEditorChange}
    />
  );
};

export default MonacoEditor;
