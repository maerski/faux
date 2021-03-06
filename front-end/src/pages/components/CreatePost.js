import mongoose from 'mongoose';
import React, { Component } from 'react';

class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textarea: ""
        }

        this.createPost = this.createPost.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({ textarea: e.target.value })
    }

    createPost(e, authorID) {
        e.preventDefault();

        const post = {
            author: mongoose.Types.ObjectId(authorID),
            caption: document.getElementById("caption").value
        }
        fetch (
            "http://localhost:3001/create-post",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }
        )
        .then(response => response.json())
        .then(body => {
            if (!body.success) { alert("Failed to create post"); }
            else { window.location.reload() }
        })
    }

    render() {
        return (
            <div className="new-post">
                <p>Create Post</p>
                <div className="fields">
                    <form>
                        <textarea id="caption" placeholder="Post something..." onChange={this.changeHandler}/>
                    </form>
                    <button disabled={!this.state.textarea} onClick={(e) => this.createPost(e, this.props.author)}>&gt;</button>
                </div>
            </div>
        );
    }
}

export default CreatePost;