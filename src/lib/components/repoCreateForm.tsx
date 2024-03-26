import React, {useEffect, useRef, useState} from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import { RepositoryCreateFormProps } from '../../pages/repositories/interface/repos_interface';


export const RepositoryCreateForm:React.FC<RepositoryCreateFormProps> = ( {id, onSubmit,setFormValid} ) => {
    const [repoName, setRepoName] = useState('');
    const [description, setDescription] = useState('');
  
    const repoNameField = useRef<HTMLInputElement>(null);
    const DescriptionField = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(true);
    console.log(visible);

    const handleChange = (e:any) => {
      setVisible(e.target.value === 'public');
      
    };

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
    const handleRepoNameChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setRepoName(e.target.value);
      };
    
      const handleDescriptionChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setDescription(e.target.value);
      };

    return (
        <Form id={id}  className='repo-create' onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: repoNameField.current ? repoNameField.current.value : '',
              description: DescriptionField.current ? DescriptionField.current.value : '',
              visible: visible
            });
        }}>
            <h4 className="mb-3">Create A New Repository</h4>
            <FloatingLabel label="Repository Name" controlId="repositryIdControl">
            <Form.Control type="text" ref={repoNameField}  placeholder="my-data-lake" onChange={handleRepoNameChange}/>               
            </FloatingLabel>
            <FloatingLabel label="Description" controlId="repositryIdControl">
            <Form.Control type="text" ref={DescriptionField}  placeholder="my-data-lake" onChange={handleDescriptionChange}/>               
            </FloatingLabel>
            <Form.Group controlId="repositryIdControl" className='repo-Visable'>
            <code>Do You want your repository to be discovered by others?</code>
            <Form.Check
            type="radio"
            label="public"
            name="visibility"
            value="public"
            onChange={handleChange}
            />
            <Form.Check
            type="radio"
            label="private"
            name="visibility"
            value="private"
            onChange={handleChange}
            />
            </Form.Group>
        </Form>
    );
}

