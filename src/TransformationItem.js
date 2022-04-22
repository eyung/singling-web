import React, {useCallback} from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

const TransformationItem = ({transformationsData, onTransformationAdd, data, deleteHandler}) => {
 
    const handleTransformationAdd = useCallback(e => {
      onTransformationAdd(e.target.value)
    }, [onTransformationAdd])
  
    return (
      
        <ListItem className="TransformationListItem"
          secondaryAction={
            <IconButton edge="end" onClick={deleteHandler}>
              <DeleteOutlineIcon />
            </IconButton>
          }
        >
          <ListItemText
            //primary= {JSON.stringify(transformationsData)}
            primary = {`CHANGE ${data.soundMod} TO ${data.soundModValue} WHEN ${data.mod} IS ${data.modOperator} ${data.modValue}`}
          />
        </ListItem>

    )
}
export default TransformationItem;