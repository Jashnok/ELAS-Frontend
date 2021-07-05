import {withStyles} from "@material-ui/core/styles";
import {deepOrange} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const DeepOrangeSwitch = withStyles({
    switchBase: {
        color: deepOrange[200],
        '&$checked': {
            color: deepOrange[300],
        },
        '&$checked + $track': {
            backgroundColor: deepOrange[300],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default DeepOrangeSwitch;