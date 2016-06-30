import React from 'react';
import ReactDOM from 'react-dom/server';

export class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  loadImage() {
    const { src } = this.props;
    const loader = new window.Image();
    loader.onload = () => {
      this.setState({ loaded: true }, () => {
        if (typeof this.props.onLoad === 'function') {
          this.props.onLoad();
        }
      });
    };
    loader.src = src;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ loaded: false });
      this.loadImage();
    }
  }

  componentDidMount() {
    this.loadImage();
  }

  render() {
    const { src, width, height, styles = {}, ...rest } = this.props;

    const style = {
      image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      },
      container: {
        position: 'relative',
        height: 0,
        paddingBottom: `${(height / width) * 100}%`,
      },
    };

    const image = (
      <img
        {...rest}
        className={styles.image}
        style={style.image}
        src={src}
        height={height}
        width={width}
      />
    );

    const inner = {
      __html: ReactDOM.renderToStaticMarkup(image),
    };

    return (
      <div style={style.container} className={styles.container}>
        {this.state.loaded ? image : null}
        <noscript dangerouslySetInnerHTML={inner} />
      </div>
    );
  }
}

LazyImage.propTypes = {
  url: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

const Image = ({ image, ...rest }) => {
  if (!image || !image.urls || image.urls.length < 1) {
    return null;
  }
  const { url, width, height } = image.urls[0];
  if (!width || !height) {
    console.warn('Warning: height or width not supplied to <Image>');
  }
  return (
    <LazyImage {...rest} src={url} width={width} height={height} />
  );
};

export default Image;
