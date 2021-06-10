import {withStyles} from "@material-ui/core/styles";
import {blue, purple} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const BlueSwitch = withStyles({
    switchBase: {
        color: blue[300],
        '&$checked': {
            color: blue[500],
        },
        '&$checked + $track': {
            backgroundColor: blue[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default BlueSwitch;