import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Dashboard(props) {
	const { classes } = props

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	const [github, setGithub] = useState('')
	const [linkedin, setLinkedin] = useState('')
	const [twitter, setTwitter] = useState('')
	const [dob, setDOB] = useState('')
	const [phone, setPhone] = useState('')
	const [university, setUniversity] = useState('')

	useEffect(() => {
		firebase.getCurrentUserGithub().then(setGithub)
		firebase.getCurrentUserPhone().then(setPhone)
		firebase.getCurrentUserDOB().then(setDOB)
		firebase.getCurrentUserLinkedin().then(setLinkedin)
		firebase.getCurrentUserTwitter().then(setTwitter)
		firebase.getCurrentUserUniversity().then(setUniversity)
	})

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography  variant="h4">
					Hello { firebase.getCurrentUsername() }
				</Typography>
				<Typography variant="h6"c>
					Your Github Handle : {github ? `"${github}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography variant="h6">
					Your DOB : {dob ? `"${dob}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography variant="h6">
					Your Phone : {phone ? `"${phone}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography variant="h6">
					Your Linkedin : {linkedin ? `"${linkedin}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography variant="h6">
					Your Twitter : {twitter ? `"${twitter}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography  variant="h6">
					Your University : {university ? `"${university}"` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))