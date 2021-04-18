// in src/MyUrlField.js
import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';
import PropTypes from "prop-types";

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

function MyUrlField({ record = {}, source }) {
    const classes = useStyles();
    return (
        <a href={record[source]} className={classes.link}>
            {record[source]}
            <LaunchIcon className={classes.icon} />
        </a>
    );
}

//const UrlField = ({ record = {}, source }) => (
//<a href={recprd[source]}>{record[source]}</a>
//);

UrlField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

export default MyUrlField;
