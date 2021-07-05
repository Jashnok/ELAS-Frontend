import {withStyles} from "@material-ui/core/styles";
import {lightBlue} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const LightBlueSwitch = withStyles({
    switchBase: {
        color: lightBlue[300],
        '&$checked': {
            color: lightBlue[500],
        },
        '&$checked + $track': {
            backgroundColor: lightBlue[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default LightBlueSwitch;