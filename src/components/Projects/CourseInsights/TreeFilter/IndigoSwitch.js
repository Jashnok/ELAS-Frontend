import {withStyles} from "@material-ui/core/styles";
import {indigo} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const IndigoSwitch = withStyles({
    switchBase: {
        color: indigo[300],
        '&$checked': {
            color: indigo[500],
        },
        '&$checked + $track': {
            backgroundColor: indigo[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default IndigoSwitch;