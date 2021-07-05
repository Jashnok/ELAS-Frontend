import { withStyles} from "@material-ui/core/styles";
import { lightGreen} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const LightGreenSwitch = withStyles({
    switchBase: {
        color: lightGreen[300],
        '&$checked': {
            color: lightGreen[500],
        },
        '&$checked + $track': {
            backgroundColor: lightGreen[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default LightGreenSwitch;