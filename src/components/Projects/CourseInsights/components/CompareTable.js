import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset"
		}
	}
});

function createData(name, recommendation, understandability, fairness, support, material, interest, fun, effort) {
	return {
		name,
		recommendation,
		understandability,
		fairness,
		support,
		material,
		interest,
		fun,
		effort,
		overlap: [
			{ course: "Other course 1", Date: "2020-01-05", Time: "08:30 - 10:30" },
			{ course: "Other course 2", Date: "2020-01-06", Time: "14:00 - 16:00" }
		]
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	
	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.recommendation}</TableCell>
				<TableCell align="right">{row.understandability}</TableCell>
				<TableCell align="right">{row.fairness}</TableCell>
				<TableCell align="right">{row.support}</TableCell>
				<TableCell align="right">{row.material}</TableCell>
				<TableCell align="right">{row.interest}</TableCell>
				<TableCell align="right">{row.fun}</TableCell>
				<TableCell align="right">{row.effort}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="h6" gutterBottom component="div">
								Overlap with other courses
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>Course</TableCell>
											<TableCell>Date</TableCell>
											<TableCell>Time</TableCell>
											
										</TableRow>
									</TableHead>
									<TableBody>
										{row.overlap.map((overlapRow) => (
											<TableRow key={overlapRow.date}>
												<TableCell component="th" scope="row">
													{overlapRow.course}
												</TableCell>
												<TableCell>{overlapRow.Date}</TableCell>
												<TableCell>{overlapRow.Time}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		calories: PropTypes.number.isRequired,
		carbs: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				amount: PropTypes.number.isRequired,
				customerId: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired
			})
		).isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		protein: PropTypes.number.isRequired
	}).isRequired
};

export default function CompareTable(props) {
	let overlappingCourses = props.overlapCourses;
	let course = props.course;
	const rows = [
		createData(course.name, 5, 3, 2, 2, 4, 2, 3, 5)
	]
	
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Course name</TableCell>
						<TableCell align="right">Recommendation</TableCell>
						<TableCell align="right">Understandability</TableCell>
						<TableCell align="right">Fairness</TableCell>
						<TableCell align="right">Support</TableCell>
						<TableCell align="right">Material</TableCell>
						<TableCell align="right">Interest</TableCell>
						<TableCell align="right">Fun</TableCell>
						<TableCell align="right">Effort</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
