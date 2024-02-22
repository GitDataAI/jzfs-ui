import React, {useEffect, useRef, useState} from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Form from "react-bootstrap/Form";


export const RepositoryCreateForm = ( {id, onSubmit,setFormValid} ) => {
    const [repoName, setRepoName] = useState('');
    const [description, setDescription] = useState('');
    const [storageCfg, setStorageCfg] = useState('');
  
    const repoNameField = useRef<HTMLInputElement>(null);
    const DescriptionField = useRef<HTMLInputElement>(null);
    const storageCfgField = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (repoNameField.current) {
        repoNameField.current.focus();
      }
    }, []);
  
    useEffect(() => {
      if (repoName || repoName && description) {
        setFormValid(true);
      } else  {
        setFormValid(false);
      }
    }, [repoName, description]);
    const handleRepoNameChange = (e) => {
        setRepoName(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
    
      const handleStorageCfgChange = (e) => {
        setStorageCfg(e.target.value);
      };
    return (
        <Form id={id} onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                name: repoNameField.current? repoNameField.current.value :'',
                Description: DescriptionField.current ?DescriptionField.current.value : '',
                blockstore_config: storageCfgField.current ?storageCfgField.current.value : '',
              });
        }}>
            <h4 className="mb-3">Create A New Repository</h4>
            <FloatingLabel label="Repository Name" controlId="repositryIdControl">
            <Form.Control type="text" ref={repoNameField}  placeholder="my-data-lake" onChange={handleRepoNameChange}/>               
            </FloatingLabel>
            <FloatingLabel label="Description" controlId="repositryDescControl">
            <Form.Control type="text" ref={DescriptionField}  placeholder="my-data-lake" onChange={handleDescriptionChange}/>  
            </FloatingLabel>
            <FloatingLabel label="storage config" controlId="repositryStorageCfgControl">
            <Form.Control type="text" ref={storageCfgField}  placeholder="my-data-lake" onChange={handleStorageCfgChange}/>               
            </FloatingLabel>
        </Form>
    );
}

