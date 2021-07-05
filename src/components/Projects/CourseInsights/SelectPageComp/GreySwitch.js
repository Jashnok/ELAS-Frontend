import {withStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const GreySwitch = withStyles({
    switchBase: {
        color: grey[400],
        '&$checked': {
            color: grey[600],
        },
        '&$checked + $track': {
            backgroundColor: grey[600],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default GreySwitch;