import {withStyles} from "@material-ui/core/styles";
import {teal} from "@material-ui/core/colors";
import {Switch} from "@material-ui/core";

const TealSwitch = withStyles({
    switchBase: {
        color: teal[200],
        '&$checked': {
            color: teal[300],
        },
        '&$checked + $track': {
            backgroundColor: teal[300],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default TealSwitch;