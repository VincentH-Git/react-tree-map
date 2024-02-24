import CustomText from './CustomText';
import { DataInputProps } from '../utils/Structure';

const DataInput = (props: DataInputProps) => {
    const { data, handleTextOnChange, dataError } = props;
    return (
        <div className="marginBottom50">
            <CustomText>Data</CustomText>
            <textarea className="textInput data" value={data} onChange={handleTextOnChange}></textarea>
            {dataError.length > 0 && (
                <div className="errorContainer">
                    <CustomText style={{ color: 'red', width: '100%' }}>
                        Data Error: <br />
                        {dataError.split(',').map((each, index) => {
                            return (
                                <CustomText key={index} style={{ marginBottom: 0, color: 'red' }}>
                                    {each}
                                </CustomText>
                            );
                        })}
                    </CustomText>
                </div>
            )}
        </div>
    );
};

export default DataInput