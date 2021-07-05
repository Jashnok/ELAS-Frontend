import { withStyles} from "@material-ui/core/styles";
import {lime} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const LimeSwitch = withStyles({
    switchBase: {
        color: lime[300],
        '&$checked': {
            color: lime[500],
        },
        '&$checked + $track': {
            backgroundColor: lime[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default LimeSwitch;