import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TermsOfService:React.FC< Props> = ({ isOpen, onClose }) => {
    return (
        <Dialog
            visible={isOpen}
            style={{width: '50%'}}
            onHide={onClose}
            header="Terms Of Service"
            closable={false}
            footer={
                <>
                    <div className="flex justify-end p-4">
                        <Button onClick={onClose} label="Close" className="bg-[#f34d01e6] text-[#ffffff] p-button"/>
                    </div>
                </>
            }
        >
            <p>Thank you for using DoltHub. Please read this Terms of Service agreement carefully before accessing or using DoltHub.</p>

            {/* 隐私政策的详细内容 */}

        </Dialog>
    );
};

export default TermsOfService;