import ReactController from 'chariot/reactController';
import IndexPage from './views/pages/indexPage';

class Index extends ReactController {
  dataValidators (data, ctx) {
    if (data.links && data.links.length === 0 && (ctx.query.after || ctx.query.before)) {
      ctx.redirect(`${ctx.path}?error=refresh`);
      return false;
    }
  }

  get data () {
    const { req, api } = this.props;
    const { first, last, sort } = req.query;
    const { subreddit } = req.params;

    const linkGetParams = { sort, first, last, subreddit };

    return {
      links: api.links.get(linkGetParams),
    };
  }

  page = IndexPage;
}

export default Index;
