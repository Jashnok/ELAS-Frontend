import {withStyles} from "@material-ui/core/styles";
import {purple} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default PurpleSwitch;