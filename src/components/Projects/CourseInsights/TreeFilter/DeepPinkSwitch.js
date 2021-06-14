import {withStyles} from "@material-ui/core/styles";
import {pink} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const DeepPinkSwitch = withStyles({
    switchBase: {
        color: pink[300],
        '&$checked': {
            color: pink[500],
        },
        '&$checked + $track': {
            backgroundColor: pink[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default DeepPinkSwitch;