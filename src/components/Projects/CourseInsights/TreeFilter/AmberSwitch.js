import {withStyles} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const AmberSwitch = withStyles({
    switchBase: {
        color: amber[300],
        '&$checked': {
            color: amber[500],
        },
        '&$checked + $track': {
            backgroundColor: amber[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default AmberSwitch;