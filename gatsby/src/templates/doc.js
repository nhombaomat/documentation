import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"

import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import GetFeedback from "../components/getFeedback"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"
import Partial from "../components/partial"
import Image from "../layout/image"
import ChecklistItem from "../components/checklistItem"
import Example from "../components/styleExample"

const shortcodes = {
  Callout,
  Alert,
  Accordion,
  ExternalLink,
  Icon,
  Popover,
  TabList,
  Tab,
  Card,
  CardGroup,
  Enablement,
  Color,
  Download,
  Partial,
  ChecklistItem,
  Image,
  Example,
}

class DocTemplate extends React.Component {
  componentDidMount() {
    window.jQuery('[data-toggle="tooltip"]').popover({
      trigger: "hover",
      placement: "right",
    })
  }

  render() {
    const node = this.props.data.mdx

    return (
      <Layout>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/assets/images/default-thumb-doc.png"}
          categories={node.frontmatter.categories}
          tags={node.frontmatter.tags}
        />
        <div className="">
          <div className="container doc-content-well">
            <div id="doc" className="doc article col-md-9 md-70">
              <HeaderBody
                title={node.frontmatter.title}
                subtitle={node.frontmatter.subtitle}
                description={node.frontmatter.description}
                slug={node.fields.slug}
                contributors={node.frontmatter.contributors}
                featured={node.frontmatter.featuredcontributor}
                editPath={node.fields.editPath}
              />
              <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                <MDXProvider components={shortcodes}>
                  <MDXRenderer>{node.body}</MDXRenderer>
                </MDXProvider>
              </div>
            </div>
            <div
              className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
              role="complementary"
            >
              <TOC title="Contents" />
            </div>
          </div>
        </div>
          <GetFeedback
            formId="tfYOGoE7"
            page={"/" + node.fields.slug}
          />
      </Layout>
    )
  }
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        description
        getfeedbackform
        categories
        contributors {
          id
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        tags
      }
      fileAbsolutePath
    }
  }
`
