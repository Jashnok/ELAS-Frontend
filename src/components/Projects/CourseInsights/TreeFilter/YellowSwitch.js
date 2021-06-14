import {withStyles} from "@material-ui/core/styles";
import {cyan} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const YellowSwitch = withStyles({
    switchBase: {
        color: cyan[300],
        '&$checked': {
            color: cyan[500],
        },
        '&$checked + $track': {
            backgroundColor: cyan[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default YellowSwitch;