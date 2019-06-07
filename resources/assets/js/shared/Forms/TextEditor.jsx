import React, { Component, Fragment } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import { convertToHTML, convertFromHTML } from 'draft-convert'

class EditorComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this._onChange = this._onChange.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  componentWillReceiveProps(next) {
    let { editorState } = this.state
    let { readOnly } = next

    if (next.value != this.props.value && readOnly) {
      this.setState({
        editorState: EditorState.push(editorState, convertFromHTML(next.value))
      })
    }
  }

  componentDidMount() {
    let { editorState } = this.state
    let { value } = this.props

    if (value) {
      this.setState({
        editorState: EditorState.push(editorState, convertFromHTML(value))
      })
    }
  }

  _editorStateToJson(editorState) {
    let data = convertToRaw(editorState.getCurrentContent())
    let jsonData = JSON.stringify(data)

    if (!data.blocks[0] || data.blocks[0].text == '') {
      jsonData = ''
    }

    return jsonData
  }

  _editorStateToHtml(editorState) {
    let content = convertToHTML(editorState.getCurrentContent())

    return content
  }

  _onChange(editorState) {
    let { onChange } = this.props
    this.setState({ editorState })

    if (onChange) {
      onChange(this._editorStateToHtml(editorState))
    }
  }

  _onBlur() {
    let { editorState } = this.state
    let { onBlur } = this.props

    if (onBlur) {
      onBlur(this._editorStateToHtml(editorState))
    }
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this._onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  _onBoldClick() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicClick() {
    this._onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    )
  }

  _onUnderlineClick() {
    this._onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    )
  }

  render() {
    let { readOnly } = this.props
    let { editorState } = this.state

    if (readOnly) {
      return (
        <div
          className="editor-read-only"
          dangerouslySetInnerHTML={{
            __html: this._editorStateToHtml(editorState)
          }}
        />
      )
    }

    return (
      <Fragment>
        <span className="mr-3">
          <button
            className="font-weight-bold btn btn-light mr-1"
            onClick={this._onBoldClick.bind(this)}
            type="button"
          >
            B
          </button>
          <button
            className="font-italic btn btn-light mr-1"
            onClick={this._onItalicClick.bind(this)}
            type="button"
          >
            I
          </button>
          <button
            className="font-italic btn btn-light"
            onClick={this._onUnderlineClick.bind(this)}
            type="button"
          >
            <u>U</u>
          </button>
        </span>

        <button
          className="btn btn-light mr-1"
          onClick={this._onUnderlineClick.bind(this)}
          type="button"
        >
          <i className="fa fa-image" />
        </button>

        <button
          className="btn btn-light"
          onClick={this._onUnderlineClick.bind(this)}
          type="button"
        >
          <i className="fa fa-upload" />
        </button>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this._onChange}
          onBlur={this._onBlur}
        />
      </Fragment>
    )
  }
}

export const TextEditor = class extends Component {
  // componentDidMount() {

  //   setTimeout(() => {
  //     ReactDOM.render(
  //       <EditorComponent />,
  //       document.getElementById('editorHere')
  //     )
  //   }, 1000)
  // }

  render() {
    let { readOnly } = this.props

    let classNames = ['text-editor']

    if (!readOnly) {
      classNames.push('p-1 form-control')
    }

    return (
      <div className={classNames.join(' ')}>
        <EditorComponent {...this.props} />
      </div>
    )
  }
}
