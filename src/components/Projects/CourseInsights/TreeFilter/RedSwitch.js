import {withStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const RedSwitch = withStyles({
    switchBase: {
        color: red[300],
        '&$checked': {
            color: red[500],
        },
        '&$checked + $track': {
            backgroundColor: red[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default RedSwitch;