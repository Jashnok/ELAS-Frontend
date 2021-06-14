import { withStyles} from "@material-ui/core/styles";
import {deepPurple} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const DeepPurpleSwitch = withStyles({
    switchBase: {
        color: deepPurple[300],
        '&$checked': {
            color: deepPurple[500],
        },
        '&$checked + $track': {
            backgroundColor: deepPurple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default DeepPurpleSwitch;