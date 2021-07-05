import {withStyles} from "@material-ui/core/styles";
import {brown} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const DeepOrangeSwitch = withStyles({
    switchBase: {
        color: brown[200],
        '&$checked': {
            color: brown[400],
        },
        '&$checked + $track': {
            backgroundColor: brown[400],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default DeepOrangeSwitch;