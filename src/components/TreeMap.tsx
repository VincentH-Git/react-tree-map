import { TreeMapProps } from '../utils/Structure';
import '../css/TreeMap.css';
import Rectangle from './Rectangle';
import CustomText from './CustomText';

const TreeMap = (props: TreeMapProps) => {
    const { data, rowNumber, weightPerRow, error } = props;
    return (
        <>
            <CustomText>Result</CustomText>
            <div className="treeMapContainer">
                {rowNumber && !error ? data.map((item, index) => {
                    return (
                        <Rectangle
                            key={index}
                            name={item.name}
                            weight={item.weight}
                            value={item.value}
                            eachWeightPerRow={weightPerRow}
                            rowNumber={rowNumber}
                        />
                    );
                }) : null}
            </div>
        </>
    );
};

export default TreeMap;
