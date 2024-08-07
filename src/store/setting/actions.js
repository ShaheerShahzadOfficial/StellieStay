import { settingSlice } from './reducers'

export const {
    reset_state,
    app_name,
    theme_scheme_direction,
    theme_scheme,
    theme_style_appearance,
    theme_color,
    theme_transition,
    theme_font_size,
    page_layout,
    header_navbar,
    header_banner,
    sidebar_color,
    sidebar_type,
    sidebar_menu_style,
    footer,
    setSetting
} = settingSlice.actions;
export default settingSlice.actions