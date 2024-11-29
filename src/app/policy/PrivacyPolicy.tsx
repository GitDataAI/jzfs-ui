import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyPolicy:React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Dialog
            visible={isOpen}
            style={{width: '50%'}}
            onHide={onClose}
            header="Privacy Policy"
            closable={false}
            footer={
                <>
                    <div className="flex justify-end p-4">
                        <Button onClick={onClose} label="Close" className="bg-[#f34d01e6] text-[#ffffff] p-button"/>
                    </div>
                </>
            }
        >
            <p className="mb-4">Thanks for entrusting GitData.AI Inc., the company that built GitData.AI Website, with your data and your personal information. Holding onto your private information is a serious responsibility, and we want you to know how we’re handling it.</p>
            <div className="text-lg font-bold mb-4">What We Collect</div>
            <ul>
                <div className="ml-4">
                    <li>Information you give us when creating an account:</li>
                    <div className="my-4 pl-5 space-y-4">
                        <li>Google Account credentials</li>
                        <li>User name</li>
                        <li>Email address</li>
                        <li>Profile Image</li>
                        <li>Biographical Information</li>
                        <li>Location</li>
                        <li>Linked Website</li>
                    </div>
                    <li className="mb-4">Dolt databases you create</li>
                    <li className="mb-4">Google Analytics</li>
                    <li className="mb-4">Website Logs</li>
                </div>
            </ul>
            <div className="text-lg font-bold mb-4">Database Contents</div>
            <div className="mb-4">
                GitData.AI, the company that owns GitData.AI Website, employees do not access private databases unless required to for security reasons, to assist the database owner with a support matter, or to maintain the integrity of the service. Our Terms of Service provides more details.
            </div>
            <div className="mb-4">
                If your repository is public, anyone (including us and unaffiliated third parties) may view its contents.
                If you have included private or sensitive information in your public database, such as email addresses or passwords, that information may be indexed by search engines or used by third parties.
            </div>
            <div className="text-lg font-bold mb-4">How we use your information</div>
            <div className="mb-4">
                <div className="ml-4">
                    <ul className="space-y-4">
                        <li>Render the website with appropriate permissions</li>
                        <li>Provide and permission access to GitData.AI repository we store</li>
                        <li>Contact you with administrative messages about your databases and teams/organizations</li>
                        <li>Market to you</li>
                        <li>Understand who is using our website and how</li>
                        <li>Protect our website and repositories from abuse or fraud</li>
                    </ul>
                </div>
            </div>
            <div className="text-lg font-bold mb-4">When we might share your personal information</div>
            <div className="mb-4">
                <div className="ml-4">We may share your personal information:</div>
                <div className="ml-4">
                    <ul className="space-y-4">
                        <li>with your consent</li>
                        <li>when we do a business deal, or negotiate a business deal, in which we'd be selling or transferring all or a part of our business or assets (such as a merger, financing, acquisition, or bankruptcy transaction or proceeding)</li>
                        <li>when others need your information to do work for us for legal or safety reasons, such as:</li>
                        <div className="ml-4">
                            <ul className="space-y-4">
                                <li>complying with applicable laws</li>
                                <li>responding to lawful requests and legal processes</li>
                                <li>protecting the rights and property of GitData.AI repository , our agents, customers, and others sharing information in an emergency, such as protecting the safety of our employees and agents, our customers, or anyone else</li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="text-lg font-bold mb-4">Choices and Changes</div>
            <div className="mb-4">
                <div className="mb-4">
                    If we send you marketing emails, we'll be sure to let you know how to opt-out. Of course, if you do opt out, we may still send you non-marketing emails. Non-marketing emails include emails about your accounts and our business dealings with you.
                </div>
                <div className="mb-4">
                    If you have any requests about your personal information, you can always send them to us at privacy@gitdata.ai. You can ask to change contact choices, opt-out of how we share with others, and update your personal information.
                </div>
            </div>
            <div className="text-lg font-bold mb-4">Contact Information</div>
            <div className="mb-4">
                <div className="mb-4">
                    Please send any questions or comments about our privacy policy at privacy@gitdata.ai.
                </div>
            </div>
            <div className="text-lg font-bold mb-4">Changes to this privacy policy</div>
            <p>We may change this privacy policy every now and then. But when we do, we'll let you know one way or
                another. You'll always be able to tell if we've issued a more recent privacy policy by checking out the Last Updated date that appears at the top of the privacy policy. And sometimes we may provide you with additional notice, like adding a statement on our site's homepage.</p>
            {/* 隐私政策的详细内容 */}
        </Dialog>
    );
};

export default PrivacyPolicy;