import {withStyles} from "@material-ui/core/styles";
import {green, purple} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const GreenASwitch = withStyles({
    switchBase: {
        color: green['A200'],
        '&$checked': {
            color: green['A400'],
        },
        '&$checked + $track': {
            backgroundColor: green['A400'],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default GreenASwitch;