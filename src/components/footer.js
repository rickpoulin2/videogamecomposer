import React from 'react'

import * as styles from './footer.scss'

const Footer = ({ copyrightLine, content }) => (
  <footer>
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <p className="footer-copyright">{copyrightLine}</p>
            <p>Web design by Rick Poulin. Additional artwork found on this website, YouTube channel, and Spotify Artist page were generated with
              artificial intelligence (AI) using <a target="_blank" href="https://www.bing.com/create">Image Creator from Microsoft Bing</a>.</p>
          </div>

          <nav className="col-12 col-md-4">
            <ul className="nav">
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="mailto:oragus2@yahoo.com" title="E-mail"><i className="fas fa-envelope"></i></a></li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://www.facebook.com/oragus2" title="Facebook"><i className="fab fa-facebook"></i></a></li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://www.youtube.com/@Francois_Gerin-Lajoie" title="YouTube"><i className="fab fa-youtube"></i></a></li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://open.spotify.com/artist/0LMAZVEqk9GYrQOfEpUKLL?si=ma4GwUhFRW6nzBIDImMrog" title="Spotify"><i
                className="fab fa-spotify"></i></a>
              </li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://oragus.bandcamp.com/" title="Bandcamp"><i className="fab fa-bandcamp"></i></a></li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://oragus.itch.io/" title="itch.io"><i className="fab fa-itch-io"></i></a></li>
              <li><a className="nav-link" target="_blank" rel="noreferrer" href="https://music.apple.com/ca/artist/fran%C3%A7ois-g%C3%A9rin-lajoie/1697343847" title="iTunes"><i
                className="fab fa-apple"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
