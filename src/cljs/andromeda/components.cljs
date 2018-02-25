(ns andromeda.components
  (:require [reagent.core :as reagent :refer [atom]]
            [andromeda.config :as config]
            [andromeda.routes :refer [navigate!]]
            [andromeda.utils :refer [className date]]))

(defn fa [icon]
  "Font awesome icons."
  [:i.fa {:class (str "fa-" icon)}])

(defn logo
  "Big site logo."
  []
  [:div.logo
    [:a.logo__link
     {:href "/"}
     [:div.logo__img]]])

(defn nav
  "Site navigation."
  [links]
  (let [item (fn [{label :label url :url}]
                 [:a.nav__link {:href url} label])]
    [:div.nav
     (map #(with-meta [item %] {:key (:label %)})
          links)]))

(defn page
  "Page layout container with navigation."
  [props & children]
  [:div.page
    props
    [nav config/nav-links]
    [:div.page__content
      (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                   children)]])

(defn main
  "Main page content."
  [& children]
  [:main.main
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn compact-search
  "A search input component."
  ([] (compact-search ""))
  ([initial-value]
    (let [query (atom initial-value)]
      (fn []
        [:form.compact-search
          {:action "/search"
           :method "get"
           :on-submit (fn [e] (.preventDefault e)
                              (navigate! (str "/search?q=" (js/encodeURIComponent @query)))
                              (reset! query ""))}
          [:input.compact-search__input
            {:name "q"
             :value @query
             :on-change #(reset! query (-> % .-target .-value))}]
          [:button.compact-search__button
            {:type "submit"}
            [fa "search"]]]))))

(defn sidebar
  "Content sidebar."
  [& children]
  [:div.sidebar
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn sidebar-image
  "An image component to be used within the sidebar."
  [src description]
  [:div.sidebar-image
    [:img.sidebar-image__img {:src src
                              :alt description}]])

(defn sidebar-greeting
  "The greeting message that appears in the sidebar."
  []
  [:div.sidebar-greeting
    [:div.sidebar-greeting__hi "Hi!"]
    "Placeholder"])

(defn sidebar-notes
  "The notes at the bottom of the sidebar."
  []
  [:div.sidebar-notes
    [:div.sidebar-notes__item
      [fa "wordpress"]
      "Proudly published with WordPress"]
    [:div.sidebar-notes__item
      [fa "copyright"]
      "2017, Kuba Birecki"]
    ])

(defn social-button
  "Social media links."
  [icon url]
  [:a.social-button
    {:href url
     :rel "noopener"
     :target "_blank"}
    [fa icon]])

(defn share-button
  "Share buttons for social media."
  ([icon url] (share-button icon nil url))
  ([icon action url]
    [:a.share-button
      {:class (className {"is-small" (not action)
                          icon true})
       :rel "noopener"
       :target "_blank"
       :href url}
      [fa icon]
      (when action [:span.share-button__action action])]))

(defn sidebar-layout
  "Page content layout with a sidebar."
  [& children]
  [:div.sidebar-layout
    [:div.sidebar-layout__content
      (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                   children)]
    [sidebar
      [:div.sidebar-layout__section.sidebar-layout__social-links
        (map #(with-meta [social-button (:icon %) (:link %)] {:key (:icon %)})
             config/social-links)]
      [:div.sidebar-layout__section.sidebar-layout__about
        [sidebar-greeting]
        [sidebar-image "/img/tmp.jpg" "That's me!"]]
      [:div.sidebar-layout__section
        [compact-search]]
      [:div.sidebar-layout__section
        [sidebar-notes]]]])

(defn disqus-thread
  "Loads a Disqus comments thread."
  [id title path]
  (let [shortname "besidesprogramming-dev"
        website-url "https://besidesprogramming.com"
        load-disqus #(if (.-DISQUS js/window)
                         (.reset (.-DISQUS js/window) #js {:reload true})
                         (.appendChild (or (.-head js/document) (.-body js/document))
                                       (doto (.createElement js/document "script")
                                             (.setAttribute "async" true)
                                             (.setAttribute "src" (str "//" shortname ".disqus.com/embed.js")))))]
    (reagent/create-class
      {:component-did-mount #(load-disqus)

       :component-did-update #(load-disqus)

       :display-name "disqus-thread"

       :reagent-render (fn [id title path]
                         (set! (.-disqus_shortname js/window) shortname)
                         (set! (.-disqus_identifier js/window) id)
                         (set! (.-disqus_title js/window) title)
                         (set! (.-disqus_url js/window) (str website-url "/" path))

                         [:div#disqus_thread.disqus-thread])})))

(defn post-action-button
  "Action button for posts."
  [action url]
  [:a.post-action-button {:href url} action])

(defn page-title
  "Page title header."
  ([title]
    [:h2.page-title title])
  ([title href]
    [:h2.page-title
      [:a.page-title__link
        {:href href}
        title]]))

(defn post-header
  "Post header including share buttons & date."
  [post]
  [:div.post-header
    [page-title (:title post) (str "/" (:slug post))]
    [:div.post-header__meta
      (share-button "facebook" (str "https://www.facebook.com/sharer/sharer.php?u=" (:link post)))
      (share-button "twitter" (str "https://twitter.com/intent/tweet?url="
                                   (:link post)
                                   ";via=ice9js;text="
                                   (:title post)
                                   ";&amp;count=none"))
      (share-button "pinterest" (str "https://pinterest.com/pin/create/button/?url="
                                     (:link post)
                                     "&media="
                                     (:image post)
                                     "&description="
                                     (:title post)))
      [:span.post-header__date (date (:date post))]]])

(defn post-content
  "Post content container."
  [content]
  [:div.post-content {:dangerouslySetInnerHTML {:__html content}}])

(defn post-footer
  "Post footer including share, next and previous buttons."
  [post]
  [:div.post-footer
    [:div.post-footer__share
      (share-button "facebook" "Share" (str "https://www.facebook.com/sharer/sharer.php?u=" (:link post)))
      (share-button "twitter" "Tweet" (str "https://twitter.com/intent/tweet?url="
                                           (:link post)
                                           ";via=ice9js;text="
                                           (:title post)
                                           ";&amp;count=none"))
      (share-button "pinterest" "Pin" (str "https://pinterest.com/pin/create/button/?url="
                                           (:link post)
                                           "&media="
                                           (:image post)
                                           "&description="
                                           (:title post)))]
    [:div.post-footer__links
      (when (:previous post)
        [:a.post-footer__link.is-prev
          {:href (str "/" (:slug (:previous post)))}
          [:span.post-footer__link-label "previous"]
          [:span.post-footer__link-title (:title (:previous post))]])
      (when (:next post)
        [:a.post-footer__link.is-next
          {:href (str "/" (:slug (:next post)))}
          [:span.post-footer__link-label "next"]
          [:span.post-footer__link-title (:title (:next post))]])]])

(defn post-excerpt
  "Post excerpt block."
  ([post] (post-excerpt post false))
  ([post full-content]
    (let [content (if full-content :content :excerpt)]
      [:div.post-excerpt
        [post-header post]
        [post-content (content post)]
        [:div.post-excerpt__actions
          (if full-content
            [post-action-button [:span [fa "comment"] "Join discussion"]
                                (str "/" (:slug post) "#disqus_thread")]
            [post-action-button "Read more…" (str "/" (:slug post))])]])))

(defn infinite-loader
  "Triggers the given callback when scrolled into view."
  [on-enter]
  (let [loader (atom nil)
        on-scroll #(when (<= (.-offsetTop @loader) (+ (.-scrollY js/window)
                                                    (.-innerHeight js/window)))
                         (on-enter))]
    (fn []
      (reagent/create-class
        {:component-did-mount #(.addEventListener js/window "scroll" on-scroll)

         :component-will-unmount #(.removeEventListener js/window "scroll" on-scroll)

         :display-name "infinite-loader"

         :render (fn [on-enter]
                   [:div.infinite-loader {:ref #(reset! loader %)}])}))))

(defn timeline
  "Timeline component."
  [year events]
  [:div.timeline
    [:h3.timeline__year year]
    [:ul.timeline__events
      (map-indexed (fn [idx event]
                     (with-meta
                       [:li.timeline__event
                         [:a
                           {:href (:url event)}
                           [:span.timeline__date (date (:date event))]
                           [:h2.timeline__event-title (:title event)]]]
                       {:key idx}))
                   events)]])
