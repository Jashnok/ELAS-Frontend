import {withStyles} from "@material-ui/core/styles";
import {yellow} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const YellowSwitch = withStyles({
    switchBase: {
        color: yellow[300],
        '&$checked': {
            color: yellow[500],
        },
        '&$checked + $track': {
            backgroundColor: yellow[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default YellowSwitch;