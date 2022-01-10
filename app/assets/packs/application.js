import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

import "../javascript/channels"
import "../javascript/english-dictionary"

Rails.start()
Turbolinks.start()
ActiveStorage.start()