import { RowNumberInputProps } from "../utils/Structure";
import CustomText from "./CustomText";

const RowNumberInput = (props: RowNumberInputProps) => {
    const { rowNumber, handleRowNumberOnChange, error } = props;
    return (
        <div>
            <CustomText>Row Number</CustomText>
            <input
                className="textInput rowNumber"
                type="number"
                value={rowNumber}
                onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
                onChange={handleRowNumberOnChange}
                placeholder="number"
                min={0}
            ></input>
            {error.length > 0 && (
                <div className="errorContainer">
                    <CustomText style={{ color: 'red', width: '100%' }}>
                        Row Number Error: <br />
                        {error.split(',').map((each, index) => {
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

export default RowNumberInput