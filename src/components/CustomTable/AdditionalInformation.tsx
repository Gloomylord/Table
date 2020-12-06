import React from "react";
import {Data} from "./index";

interface IProps {
    selectedRow: Data
}

const AdditionalInformation: React.FC<IProps> = ({selectedRow}) => {
    return (
        <div className='additional_information'>
            <div className='additional_information_main'>
                <div>
                    <label>
                        firstName: <span>{selectedRow.firstName}</span>
                    </label>
                    <label>
                        lastName: <span>{selectedRow.lastName}</span>
                    </label>
                    <label>
                        email:{' '}
                        <a href={`mailto:${selectedRow.email}`} className='link'>
                            <span>{selectedRow.email}</span>
                        </a>
                    </label>
                    <label>
                        phone: <span>{selectedRow.phone}</span>
                    </label>
                </div>
                <div>
                    <label>
                        address: <span>{selectedRow?.address?.city || '- - -'}</span>
                    </label>
                    <label>
                        street address: <span>{selectedRow?.address?.streetAddress || '- - -'}</span>
                    </label>
                    <label>
                        state: <span>{selectedRow?.address?.state || '- - -'}</span>
                    </label>
                    <label>
                        zip: <span>{selectedRow?.address?.zip || '- - -'}</span>
                    </label>
                </div>
            </div>
            {
                selectedRow?.description &&
                <label className='additional_information_description'>
                    description: <span>{selectedRow?.description || '- - -'}</span>
                </label>
            }
        </div>
    )
};

export default AdditionalInformation;
