import {withStyles} from "@material-ui/core/styles";
import {blueGrey} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const GreySwitch = withStyles({
    switchBase: {
        color: blueGrey[300],
        '&$checked': {
            color: blueGrey[500],
        },
        '&$checked + $track': {
            backgroundColor: blueGrey[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default GreySwitch;