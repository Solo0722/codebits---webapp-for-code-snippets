import { Editor, useMonaco } from "@monaco-editor/react";
import React, { useEffect } from "react";
import { GlobalContext } from "../context/context";
import { useContext } from "react";
import { DARKTHEME } from "../constants/constants";

const MonacoEditor = ({
  height,
  defaultLanguage,
  hadleEditorChange,
  language,
  value,
  canEdit,
  handleEditorChange,
  setEditorLanguages,
}) => {
  const { appTheme } = useContext(GlobalContext);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco && setEditorLanguages) {
      setEditorLanguages(monaco.languages.getLanguages());
    }
  }, [monaco, setEditorLanguages]);

  return (
    <Editor
      value={value}
      height={height || "400px"}
      defaultLanguage={defaultLanguage || "javascript"}
      language={language || defaultLanguage || "javascript"}
      defaultValue="//Add your code here"
      theme={appTheme === DARKTHEME ? "vs-dark" : "vs-light"}
      onChange={(value) => handleEditorChange(value)}
      options={{
        readOnly: !canEdit,
      }}
      className=""
    />
  );
};

export default MonacoEditor;
