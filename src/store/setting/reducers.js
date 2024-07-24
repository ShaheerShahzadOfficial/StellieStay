import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState, defaultState } from "./state.ts";

import {
  updateBodyClass,
  updateHtmlClass,
  updateHtmlAttr,
  updateTitle,
  updateColorRootVar,
  updateStorage,
  updateDomValueBySetting,
  getStorage,
  updateThemeScheme,
} from "../../utilities/setting";
import { setFontFamily } from "../../utilities/root-var";
import _ from "lodash";
import axios from "axios";
import { error } from "jquery";
const DefaultSetting = defaultState.setting;
export const ApiLink = "https://stellie-stay-backend.vercel.app"
const Choices = {
  SchemeChoice: DefaultSetting.theme_scheme.choices,
  ColorChoice: DefaultSetting.theme_color.choices,
  StyleAppearanceChoice: DefaultSetting.theme_style_appearance.choices,
  FSChoice: DefaultSetting.theme_font_size.choices,
  Animation: DefaultSetting.theme_transition.choices,
};

const createSettingObj = (state) => {
  return {
    saveLocal: state.saveLocal,
    storeKey: state.storeKey,
    setting: _.cloneDeep(state.setting),
  };
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      const json = getStorage(state.storeKey);
      if (json === "none") state.saveLocal = "none";
      if (json !== null && json !== "none") {
        state.saveLocal = json.saveLocal;
        state.setting = json.setting;
      }
      updateDomValueBySetting(state.setting, Choices);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    reset_state: (state, action) => {
      state.setting = defaultState.setting;
      updateDomValueBySetting(state.setting, Choices);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    saveLocal: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.saveLocal = action.payload;
      }
      const settingObj = {
        saveLocal: state.saveLocal,
        storeKey: state.storeKey,
        setting: _.cloneDeep(state.setting),
      };
      updateStorage(state.saveLocal, state.storeKey, settingObj);
    },
    app_name: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.app_name.value = action.payload;
      }
      updateTitle(state.setting.app_name.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_scheme_direction: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_scheme_direction.value = action.payload;
      }
      updateHtmlAttr({
        prop: "dir",
        value: state.setting.theme_scheme_direction.value,
      });
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },

    theme_scheme: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_scheme.value = action.payload;
      }
      updateHtmlAttr({
        prop: "data-bs-theme",
        value: state.setting.theme_scheme.value,
      });
      updateThemeScheme(
        state.setting.theme_scheme.value,
        Choices,
        state.setting.theme_color
      );
      updateBodyClass(Choices.SchemeChoice, state.setting.theme_scheme.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_style_appearance: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_style_appearance.value = action.payload;
      }
      updateBodyClass(
        Choices.StyleAppearanceChoice,
        state.setting.theme_style_appearance.value
      );
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_color: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        _.forEach(action.payload.colors, (value, key) => {
          state.setting.theme_color.colors[key] = value;
        });
        state.setting.theme_color.value = action.payload.value;
      }
      updateHtmlAttr({
        prop: "data-bs-theme-color",
        value: state.setting.theme_color.value,
      });
      updateBodyClass(Choices.ColorChoice, state.setting.theme_color.value);
      updateColorRootVar(
        state.setting.theme_scheme.value,
        state.setting.theme_color,
        Choices.ColorChoice
      );
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_transition: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_transition.value = action.payload;
      }
      updateBodyClass(Choices.Animation, state.setting.theme_transition.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    theme_font_size: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.setting.theme_font_size.value = action.payload;
      }
      updateHtmlClass(Choices.FSChoice, state.setting.theme_font_size.value);
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    page_layout: (state, action) => {
      state.setting.page_layout.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    header_navbar: (state, action) => {
      state.setting.header_navbar.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    header_banner: (state, action) => {
      state.setting.header_banner.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_color: (state, action) => {
      state.setting.sidebar_color.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_type: (state, action) => {
      state.setting.sidebar_type.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    sidebar_menu_style: (state, action) => {
      state.setting.sidebar_menu_style.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
    footer: (state, action) => {
      state.setting.footer.value = action.payload;
      updateStorage(state.saveLocal, state.storeKey, createSettingObj(state));
    },
  },
});

export default settingSlice.reducer;

export const loginUser = createAsyncThunk(
  '/auth/sign-in',
  async (userCredentials) => {
    console.log(userCredentials);
    let response;
    const request = await axios.post(`${ApiLink}/user/login`, userCredentials)
      .then(async (request) => {
        console.log(request);
        response = await request.data;
        localStorage.setItem("user", JSON.stringify(response))
      }).catch((error) => {
        response = error.response.data || error
        // return response
      })
    console.log(response)
    return response

  }
)
export const register = createAsyncThunk(
  '/auth/sign-up',
  async (userCredentials, thunkAPI) => {
    try {
      // console.log(userCredentials)
      const response = await axios.post(`${ApiLink}/user/register`, userCredentials);
      // console.log(response);
      return response.data; // Assuming the response contains user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loadUser = createAsyncThunk(
  "load-user",
  async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      const response = await axios.get(`${ApiLink}/user/loadUser`, { headers: { Authorization: "Bearer " + token } });
      console.log("API call successful:", response.data); 
      return response.data;
    }
    catch (error) {
      console.error("API call failed:", error); // Log the error
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = true
        state.error = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false
        if (action.error.message === "request failed with status code 491") {
          state.error = 'Access denied! invalid credentials'
        }
        else {
          state.error = action.error
        }
      }
      )
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Reducer for sign-up success state
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Reducer for sign-up failure state
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload.message, 'state.error')
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message; // Assuming error message is in payload
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Reducer for sign-up success state
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
        state.error = null;
      })
      // Reducer for sign-up failure state
      .addCase(loadUser.rejected, (state, action) => {
        console.log(action.payload.message, 'state.error')
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message; // Assuming error message is in payload
      });
  }
})

export const userReducer = userSlice.reducer;
//uploading images 

export const uploadContent = async (formData) => {
  let response

  const token = JSON.parse(localStorage.getItem("user"))?.token;
  await axios.post(`${ApiLink}/post/createPost`, formData, { headers: { Authorization: "Bearer " + token } }).then((res) => {
    console.log("api post data", response)
    response = res.data;
  }).catch((error) => {
    console.log(error);
    response = error.response?.data || error
  })
  console.log(response);
  return response
}
const initialStates = {
  uploading: false,
  uploaded: false,
  error: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialStates,
  reducers: {
    uploadContentStart: (state) => {
      state.uploading = true;
      state.uploaded = false;
      state.error = null;
    },
    uploadContentSuccess: (state) => {
      state.uploading = false;
      state.uploaded = true;
    },
    uploadContentFailure: (state, action) => {
      state.uploading = false;
      state.uploaded = false;

      state.error = action.payload;
    },
  },
});

export const { uploadContentStart, uploadContentSuccess, uploadContentFailure } = uploadSlice.actions;

export const uploadContentAsync = (formData) => async (dispatch) => {
  try {
    dispatch(uploadContentStart());

    const response = await uploadContent(formData);

    dispatch(uploadContentSuccess(response));
  } catch (error) {
    dispatch(uploadContentFailure(error.message));
  }
};

export const upload = uploadSlice.reducer;

export const fetchDataAsync = createAsyncThunk(
  'data/fetchData',
  async (apiUrl, thunkAPI) => {
    let response
    await axios.get(apiUrl).then((res) => {
      console.log(res,"getting data");
      response = res.data.post;
    }).catch((error) => {
      return thunkAPI.rejectWithValue(error.message);
    })
    return response
  }
);
export const comments = createAsyncThunk(
  'data/fetchData',
  async (apiUrl, thunkAPI) => {
    let response
    await axios.put(apiUrl).then((res) => {
      console.log(res);
      response = res.data;
    }).catch((error) => {
      return thunkAPI.rejectWithValue(error.message);
    })
    return response
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  // reducers: {}, // No synchronous actions defined here
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(comments.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(comments.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload;
      // })
      // .addCase(comments.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  }
});
export const selectData = (state) => state.data;
export const getPost = dataSlice.reducer;
