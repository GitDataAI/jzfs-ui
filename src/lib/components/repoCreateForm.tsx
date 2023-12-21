import React, {useEffect, useRef, useState} from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Form from "react-bootstrap/Form";


export const RepositoryCreateForm = ( {id, onSubmit,setFormValid} ) => {
    const [repoName, setRepoName] = useState('');
    const [description, setDescription] = useState('');
  
    const repoNameField = useRef<HTMLInputElement>(null);
    const DescriptionField = useRef<HTMLInputElement>(null);
  
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

    return (
        <Form id={id} onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                Name: repoNameField.current? repoNameField.current.value :'',
                Description: DescriptionField.current ?DescriptionField.current.value : '',
              });
        }}>
            <h4 className="mb-3">Create A New Repository</h4>
            <FloatingLabel label="Repository Name" controlId="repositryIdControl">
            <Form.Control type="text" ref={repoNameField}  placeholder="my-data-lake" onChange={handleRepoNameChange}/>               
            </FloatingLabel>
            <FloatingLabel label="Description" controlId="repositryIdControl">
            <Form.Control type="text" ref={DescriptionField}  placeholder="my-data-lake" onChange={handleDescriptionChange}/>               
            </FloatingLabel>
        </Form>
    );
}

