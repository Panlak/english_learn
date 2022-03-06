import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

import "../javascript/channels"
import "../javascript/english-dictionary"
import "../javascript/englishTest"
Rails.start()
Turbolinks.start()
ActiveStorage.start()