import React, {useCallback} from 'react';
import Editor  from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import { SQLEditorProps } from '../../interface/repos_interface';
// import "../../../../styles/ghsyntax.css";


export const SQLEditor:React.FC<SQLEditorProps> = ({ initialValue, onChange, onRun }) => {
    const [code, setCode] = React.useState(initialValue);
    const changeHandler = useCallback((code: React.SetStateAction<string> | string) => {
        setCode(code)
        if (onChange && typeof code == 'string')
            onChange(code)
    }, [setCode, onChange])
    return (
        <Editor
            value={code}
            onValueChange={changeHandler}
            highlight={code => Prism.highlight(code, Prism.languages.sql, 'sql')}
            padding={10}
            className="syntax-editor"
            onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    onRun();
                }
            }}
        />
    );
}
