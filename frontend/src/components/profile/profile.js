import React from 'react';
import TweetBox from '../tweets/tweet_box';

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserTweets(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) { 
        // does this work in conjunction with componentWillMount()? componentWillMount fetches all the tweets, this sets the tweets as the local slice of state? doesnt really make sense though, why not just put it all into componentWillMount?
        this.setState({ tweets: newState.tweets });
    }

    render() {
        if(this.state.tweets.length === 0) {
            return (<div>This user has no Tweets</div>)
        } else {
            return (
                <div>
                    <h2>All of This User's Tweets</h2>
                    {
                        this.state.tweets.map(tweet => (
                            <TweetBox key={tweet.id} text={tweet.text} />
                        ))
                    }
                </div>
            );
        }
    }
}

export default Profile; 