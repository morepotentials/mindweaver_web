db.define_table('weave',
                Field('title'),
                Field('purpose')
                )

db.define_table('weave_membership',
                Field('user_email'),
                Field('user_id', 'reference auth_user'),
                Field('weave_id', 'reference weave'),
                Field('weave_title'),
                )